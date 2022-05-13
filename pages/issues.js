import { useEffect } from "react";
import HeadInfo from "../components/HeadInfo";
import useStore from "../lib/store";
import IssueBox from "../components/IssueBox";

export default function Issues({ recivedIssues }) {
  const { issues, updateIssue } = useStore();
  const sortedIssues = [...issues];
  sortedIssues.sort((a, b) => b.comments - a.comments);

  useEffect(() => {
    updateIssue(recivedIssues);
  }, [recivedIssues]);


  return (
    <div>
      <HeadInfo title="Get issuses" keyword="Git Hub Issues" contents="Get Git Hub Issues" />
      <h1 className="mb-2">
        issues
      </h1>
      <ul className="border-collapse">
        {sortedIssues.map(issue => (
          <li key={issue.id} className="border border-soild border-grey">
            <IssueBox number={issue.number} comments={issue.comments} title={issue.title} createdAt={issue.created_at} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async ({ context }) => {
  const res = await fetch(process.env.NEXT_PUBLIC_ISSUES_API);
  const recivedIssues = await res.json();
  if (!res) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      recivedIssues
    },
    revalidate: 20,
  };
};
