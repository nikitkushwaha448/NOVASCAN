const { Client } = require('@elastic/elasticsearch');
require('dotenv').config({ path: '.env.local' });

// Support both Cloud ID and direct URL connection
const clientConfig = {};

if (process.env.ELASTIC_CLOUD_ID) {
  clientConfig.cloud = { id: process.env.ELASTIC_CLOUD_ID };
  clientConfig.auth = { apiKey: process.env.ELASTIC_API_KEY };
} else if (process.env.ELASTICSEARCH_URL) {
  clientConfig.node = process.env.ELASTICSEARCH_URL;
  // Only add auth if API key is provided (not needed for local development)
  if (process.env.ELASTIC_API_KEY) {
    clientConfig.auth = { apiKey: process.env.ELASTIC_API_KEY };
  }
} else {
  console.error('Error: Either ELASTIC_CLOUD_ID or ELASTICSEARCH_URL must be configured in .env.local');
  process.exit(1);
}

const client = new Client(clientConfig);

const indexName = 'social_posts';

const indexMapping = {
  mappings: {
    properties: {
      id: { type: 'keyword' },
      platform: { type: 'keyword' },
      title: { type: 'text' },
      content: { type: 'text' },
      author: { type: 'keyword' },
      url: { type: 'keyword' },
      created_at: { type: 'date' },
      score: { type: 'integer' },
      num_comments: { type: 'integer' },
      tags: { type: 'keyword' },
      embedding: {
        type: 'dense_vector',
        dims: 768,
        index: true,
        similarity: 'cosine',
      },
      indexed_at: { type: 'date' },
      sentiment: {
        properties: {
          score: { type: 'float' },
          comparative: { type: 'float' },
          label: { type: 'keyword' },
          confidence: { type: 'float' },
        },
      },
      quality: {
        properties: {
          textLength: { type: 'integer' },
          wordCount: { type: 'integer' },
          readabilityScore: { type: 'float' },
          hasCode: { type: 'boolean' },
          hasLinks: { type: 'boolean' },
          spamScore: { type: 'float' },
        },
      },
      domain_context: { type: 'keyword' },
      relevance_score: { type: 'float' },
    },
  },
  settings: {
    number_of_shards: 1,
    number_of_replicas: 1,
  },
};

async function setupElasticsearch() {
  try {
    console.log('🔍 Checking Elasticsearch connection...');
    
    // Check connection
    const health = await client.cluster.health();
    console.log('✅ Connected to Elasticsearch');
    console.log(`   Cluster status: ${health.status}`);

    // Check if index exists
    const indexExists = await client.indices.exists({ index: indexName });

    if (indexExists) {
      console.log(`\n⚠️  Index "${indexName}" already exists`);
      console.log('   Do you want to delete and recreate it? (This will delete all data)');
      console.log('   Run: npm run setup-es -- --force');
      
      if (process.argv.includes('--force')) {
        console.log('\n🗑️  Deleting existing index...');
        await client.indices.delete({ index: indexName });
        console.log('✅ Index deleted');
      } else {
        console.log('\n✅ Setup complete (index already exists)');
        return;
      }
    }

    // Create index
    console.log(`\n📦 Creating index "${indexName}"...`);
    await client.indices.create({
      index: indexName,
      body: indexMapping,
    });
    console.log('✅ Index created successfully');

    // Verify index
    const mapping = await client.indices.getMapping({ index: indexName });
    console.log('\n📋 Index mapping:');
    console.log(JSON.stringify(mapping[indexName].mappings.properties, null, 2));

    console.log('\n✨ Elasticsearch setup complete!');
    console.log(`   Index: ${indexName}`);
    console.log('   Ready to index social posts');

  } catch (error) {
    console.error('\n❌ Error setting up Elasticsearch:');
    console.error(error.message);
    
    if (error.meta?.body?.error) {
      console.error('\nDetails:', error.meta.body.error);
    }

    process.exit(1);
  }
}

// Run setup
setupElasticsearch();
