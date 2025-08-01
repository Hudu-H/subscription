import { Client as WorkflowClient } from '@upstash/workflow';
import { QSTASH_TOKEN, QSTASH_URL } from './env.js';

export const workflowClient = new WorkflowClient({
	token: QSTASH_TOKEN,
	baseUrl: QSTASH_URL,
});
