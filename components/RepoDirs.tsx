import Link from 'next/link';
import { FaFolder } from 'react-icons/fa';

interface RepoProps {
  name: string;
}

// GitHub API의 디렉토리 또는 파일 정보를 위한 타입 정의
interface Content {
  type: string;
  path: string;
  name: string;
}

const RepoDirs: React.FC<RepoProps> = async ({ name }) => {
  //const username = 'bradtraversy';
  const username = 'sung0125';
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    `https://api.github.com/repos/${username}/${name}/contents`
  );
  const contents: Content[] = await response.json(); // Content[] 타입 지정
  const dirs = contents.filter((content: Content) => content.type === 'dir'); // Content 타입 사용

  return (
    <div className='mt-2'>
      <div className='flex items-center'>
        <FaFolder />
        <h3 className='text-xl font-bold'>Directories</h3>
      </div>
      <ul>
        {dirs.map((dir: Content) => (
          <li key={dir.path} className='flex items-center'>
            <FaFolder />
            <Link
              className='underline'
              href={`https://github.com/${username}/${name}/tree/master/${dir.path}`}
            >
              {dir.path}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoDirs;
