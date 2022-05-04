import useSWR from 'swr';
import { Box, Heading, Label, LabelGroup } from '@primer/react';
import { ResponsiveContainer, BarChart, Bar, Tooltip, XAxis } from 'recharts';

import { DefaultLayout } from 'pages/interface/index.js';

export default function Page() {
  const { data: statusObject, isLoading: statusObjectIsLoading } = useSWR('/api/v1/status', { refreshInterval: 1000 });
  const { data: usersCreated } = useSWR('/api/v1/analytics/users-created', { refreshInterval: 1000 });
  const { data: rootContentPublished } = useSWR('/api/v1/analytics/root-content-published', { refreshInterval: 1000 });
  const { data: childContentPublished } = useSWR('/api/v1/analytics/child-content-published', {
    refreshInterval: 1000,
  });

  return (
    <DefaultLayout metadata={{ title: 'Estatísticas e Status do Site' }}>
      <Box sx={{ display: 'grid', width: '100%' }}>
        <Heading as="h1">Estatísticas e Status do Site</Heading>

        <Box>
          <h2>Novos cadastros</h2>

          <ResponsiveContainer width="100%" aspect={9}>
            <BarChart height={400} data={usersCreated}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar type="monotone" dataKey="cadastros" fill="#2da44e" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box>
          <h2>Novas publicações</h2>
          <ResponsiveContainer width="100%" aspect={9}>
            <BarChart height={400} data={rootContentPublished}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar type="monotone" dataKey="conteudos" fill="#2da44e" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box>
          <h2>Novas respostas</h2>
          <ResponsiveContainer width="100%" aspect={9}>
            <BarChart height={400} data={childContentPublished}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar type="monotone" dataKey="respostas" fill="#2da44e" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box>
          <h2>Banco de Dados</h2>

          {!statusObjectIsLoading && (
            <Box sx={{ display: 'grid' }}>
              <Box>
                Status:{' '}
                <Label variant={statusObject?.dependencies.database.status ? 'success' : 'danger'}>
                  {statusObject?.dependencies.database.status}
                </Label>
              </Box>
              <Box>
                Conexões disponíveis:{' '}
                <Label variant={statusObject?.dependencies.database.max_connections > 70 ? 'success' : 'danger'}>
                  {statusObject?.dependencies.database.max_connections}
                </Label>
              </Box>
              <Box>
                Conexões abertas:{' '}
                <Label variant={statusObject?.dependencies.database.opened_connections < 40 ? 'success' : 'danger'}>
                  {statusObject?.dependencies.database.opened_connections}
                </Label>
              </Box>
              <Box>
                Latência:{' '}
                <LabelGroup>
                  <Label variant={statusObject?.dependencies.database.latency.first_query < 200 ? 'success' : 'danger'}>
                    {`${Math.round(statusObject?.dependencies.database.latency.first_query)}ms`}
                  </Label>
                  <Label
                    variant={statusObject?.dependencies.database.latency.second_query < 200 ? 'success' : 'danger'}>
                    {`${Math.round(statusObject?.dependencies.database.latency.second_query)}ms`}
                  </Label>
                  <Label variant={statusObject?.dependencies.database.latency.third_query < 200 ? 'success' : 'danger'}>
                    {`${Math.round(statusObject?.dependencies.database.latency.third_query)}ms`}
                  </Label>
                </LabelGroup>
              </Box>
              <Box>
                Versão do PostgreSQL:{' '}
                <Label variant={statusObject?.dependencies.database.version ? 'success' : 'danger'}>
                  {statusObject?.dependencies.database.version}
                </Label>
              </Box>
            </Box>
          )}
        </Box>

        <Box>
          <h2>Servidor Web</h2>

          {!statusObjectIsLoading && (
            <Box sx={{ display: 'grid' }}>
              <Box>
                Status:{' '}
                <Label variant={statusObject?.dependencies.webserver.status ? 'success' : 'danger'}>
                  {statusObject?.dependencies.webserver.status}
                </Label>
              </Box>
              <Box>
                Provedor:{' '}
                <Label variant={statusObject?.dependencies.webserver.provider ? 'success' : 'danger'}>
                  {statusObject?.dependencies.webserver.provider}
                </Label>
              </Box>
              <Box>
                Ambiente:{' '}
                <Label variant={statusObject?.dependencies.webserver.environment ? 'success' : 'danger'}>
                  {statusObject?.dependencies.webserver.environment}
                </Label>
              </Box>
              <Box>
                Região na AWS:{' '}
                <Label variant={statusObject?.dependencies.webserver.aws_region ? 'success' : 'danger'}>
                  {statusObject?.dependencies.webserver.aws_region}
                </Label>
              </Box>
              <Box>
                Região na Vercel:{' '}
                <Label variant={statusObject?.dependencies.webserver.vercel_region ? 'success' : 'danger'}>
                  {statusObject?.dependencies.webserver.vercel_region}
                </Label>
              </Box>
              <Box>
                Timezone:{' '}
                <Label variant={statusObject?.dependencies.webserver.timezone ? 'success' : 'danger'}>
                  {statusObject?.dependencies.webserver.timezone}
                </Label>
              </Box>
              <Box>
                Autor do último commit:{' '}
                <Label variant={statusObject?.dependencies.webserver.last_commit_author ? 'success' : 'danger'}>
                  {statusObject?.dependencies.webserver.last_commit_author}
                </Label>
              </Box>
              <Box>
                Mensagem no commit:{' '}
                <Label variant={statusObject?.dependencies.webserver.last_commit_message ? 'success' : 'danger'}>
                  {statusObject?.dependencies.webserver.last_commit_message}
                </Label>
              </Box>
              <Box>
                SHA do commit:{' '}
                <Label variant={statusObject?.dependencies.webserver.last_commit_message_sha ? 'success' : 'danger'}>
                  {statusObject?.dependencies.webserver.last_commit_message_sha}
                </Label>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </DefaultLayout>
  );
}
