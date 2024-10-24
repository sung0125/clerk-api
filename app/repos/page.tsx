import Link from 'next/link';
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa';

//const username = 'bradtraversy';
const username = 'sung0125';

// Repo 인터페이스 정의
interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number; // stargazers_count와 달리 watch 횟수를 카운트
}

export default async function ReposPage() {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    { next: { revalidate: 60 } }
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const repos: Repo[] = await response.json(); // Repo[] 타입으로 지정

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>
        Github Repositories of {username}
      </h2>
      <ul>
        {repos.map((repo: Repo) => (
          <li key={repo.id} className='bg-gray-100 m-4 p-4 rounded-md'>
            <Link href={`/repos/${repo.name}`}>
              <h3 className='text-xl font-bold'>{repo.name}</h3>
              <p>{repo.description}</p>
              <div className='flex justify-between items-center'>
                <span className='flex items-center gap-1'>
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className='flex items-center gap-1'>
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span className='flex items-center gap-1'>
                  <FaEye /> {repo.watchers_count}{' '}
                  {/* stargazers_count에서 watchers_count로 변경 */}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
