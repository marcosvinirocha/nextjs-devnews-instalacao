import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const courses = [
    { id: 1, name: 'Next.js com typescript' },
    { id: 2, name: 'react.js com typescript' },
    { id: 3, name: 'Node.js com typescript' },
    { id: 4, name: 'sass' },
    { id: 5, name: 'Styled-components' },
  ];

  return res.json(courses);
};
