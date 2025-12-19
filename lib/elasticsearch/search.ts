import { getEsClient } from './client';
import { parseGoogleCredentials } from '../utils/credentials';
import type { SearchRequest, SearchResponse, SocialPost } from '../types';

const RERANKER_INFERENCE_ID = 'vertex_ai_reranker';

export const hybridSearch = async (params: SearchRequest): Promise<SearchResponse> => {
  const client = getEsClient();
  const startTime = Date.now();

  try {
    const { query, filters = {}, limit = 20, offset = 0, useReranking = false } = params;

    const must: any[] = [
      {
        multi_match: {
          query,
          fields: ['title^3', 'content^2', 'tags^2'],
          type: 'best_fields',
          fuzziness: 'AUTO',
        },
      },
    ];

    if (filters.platforms && filters.platforms.length > 0) {
      must.push({ terms: { platform: filters.platforms } });
    }

    if (filters.tags && filters.tags.length > 0) {
      must.push({ terms: { tags: filters.tags } });
    }

    if (filters.sentiment) {
      must.push({ term: { 'sentiment.label': filters.sentiment } });
    }

    if (filters.dateRange) {
      must.push({
        range: {
          created_at: {
            gte: filters.dateRange.from,
            lte: filters.dateRange.to,
          },
        },
      });
    }

    if (filters.minScore) {
      must.push({ range: { score: { gte: filters.minScore } } });
    }

    const searchBody: any = {
      query: {
        bool: {
          must,
        },
      },
      from: offset,
      size: limit,
      sort: [{ _score: 'desc' }, { created_at: 'desc' }],
    };

    const response = await client.search({
      index: 'social_posts',
      body: searchBody,
    });

    const results: SocialPost[] = response.hits.hits.map((hit: any) => ({
      ...hit._source,
      relevance_score: hit._score,
    }));

    const searchTimeMs = Date.now() - startTime;

    return {
      query,
      results,
      total_results: typeof response.hits.total === 'number' ? response.hits.total : response.hits.total?.value || 0,
      search_time_ms: searchTimeMs,
    };
  } catch (error: any) {
    console.error('Search error:', error.message);
    throw new Error(`Search failed: ${error.message}`);
  }
};

export const checkRerankingEndpoint = async (): Promise<boolean> => {
  try {
    const client = getEsClient();
    await client.inference.get({
      inference_id: RERANKER_INFERENCE_ID,
    });
    return true;
  } catch (error: any) {
    if (error.meta?.statusCode === 404) {
      return false;
    }
    throw error;
  }
}

export const createRerankingEndpoint = async (): Promise<void> => {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  const serviceAccountCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!projectId) {
    throw new Error('GOOGLE_CLOUD_PROJECT_ID environment variable is required for reranking');
  }

  if (!serviceAccountCredentials) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is required for reranking');
  }

  const credentials = parseGoogleCredentials(serviceAccountCredentials);
  const serviceAccountJson = JSON.stringify(credentials);

  const client = getEsClient();

  try {
    await client.inference.put({
      inference_id: RERANKER_INFERENCE_ID,
      task_type: 'rerank',
      inference_config: {
        service: 'googlevertexai',
        service_settings: {
          service_account_json: serviceAccountJson,
          project_id: projectId,
          model_id: 'semantic-ranker-512@latest',
        },
      },
    });
  } catch (error: any) {
    console.error('Failed to create endpoint:', error.message);
  }
}

export const setupRerankingEndpoint = async (): Promise<void> => {
  try {
    const exists = await checkRerankingEndpoint();

    if (!exists) {
      await createRerankingEndpoint();
    }
  } catch (error: any) {
    throw error;
  }
}

export const deleteRerankingEndpoint = async (): Promise<void> => {
  const client = getEsClient();

  try {
    await client.inference.delete({
      inference_id: RERANKER_INFERENCE_ID,
    });

  } catch (error: any) {
    if (error.meta?.statusCode === 404) {
      return;
    }
    throw error;
  }
}

export { RERANKER_INFERENCE_ID };