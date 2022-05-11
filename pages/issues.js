import HeadInfo from "../components/HeadInfo";
import Image from "next/image";

const issues = ({ issues }) => {
  console.log(issues)

  return (
    <div>
      <HeadInfo title="Get issuses" />
      <h1>
        issues
      </h1>
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>
            <Image src={issue.user.avatar_url} width={100} height={100} alt={issue.title} />
          </li>
        ))}
      </ul>
    </div>
  )
}

// export const getServerSideProps = async () => {
//   const res = await fetch("https://api.github.com/repos/facebook/create-react-app/issues");
//   const posts = await res.json();

//   return {
//     props: {
//       posts
//     }
//   };
// };

export const getStaticProps = async ({ context }) => {
  const res = await fetch(process.env.NEXT_PUBLIC_ISSUES_API);
  const issues = await res.json();
  console.log(11111)
  if (!res) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      issues
    },
    revalidate: 20,
  };
};

export default issues