import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const coverPath = '/images/99400958c2d118118dd486f62fb96ac4.jpeg';
const posterPath = '/images/fa1c400b7d2296d546cf113cf35ee9a6.jpeg';
const contentId = '6594930f6c2f2cb13fe1622a';

const p = new PrismaClient({
  log: ['query'],
});

async function main() {
  const s = await p.serie.create({
    data: {
      coverPath,
      posterPath,
      id: randomUUID(),
      title: 'Homem de Ferro 2',
      synopsis:
        'Homem de Ferro é um personagem dos quadrinhos publicados pela Marvel Comics. Sua verdadeira identidade é o empresário e bilionário Tony Stark, que usa armaduras de alta tecnologia no combate ao crime. Foi criado em 1963 pelo escritor Stan Lee, o roteirista Larry Lieber e os desenhistas Jack Kirby e Don Heck.',
    },
  });

  await p.episode.createMany({
    data: [1, 2, 3, 4, 5, 6, 7].map((v) => ({
      contentId,
      coverPath,
      synopsis: s.synopsis,
      title: `Episódio ${v}`,
      id: randomUUID(),
      serieId: s.id,
      metadata: {
        lengthInSeconds: 151,
      },
    })),
  });
}

main()
  .then(async () => {
    await p.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await p.$disconnect();
    process.exit(1);
  });
