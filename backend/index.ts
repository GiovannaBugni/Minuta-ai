import { router } from '@appdeploy/sdk';
import { generateReport } from './report';

export const handler = router({
  'POST /api/report': [async ({ body }) => generateReport(body)],
});

