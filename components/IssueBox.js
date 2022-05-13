import Image from "next/image";

export default function IssueBox({ title, comments, number, createdAt }) {
  const diffTime = (new Date().getTime() - new Date(createdAt).getTime()) / 1000 / 60;
  let time = createdAt.slice(0, 10);
  if (diffTime < 1) {
    time = "just before"
  } else if (diffTime < 60) {
    time = `${Math.floor(diffTime)}minutes before`;
  } else if ((diffTime / 60) < 24) {
    time = `${Math.floor(diffTime / 60)}hours before`;
  }

  return (
    <div className="flex flex-nowrap justify-between px-2">
      <div>
        <div className="max-w-md text-ml font-bold">{title}</div>
        <div className="text-grey text-xs">#{number} {time}</div>
      </div>
      <div className="min-w-0 flex flex-nowrap items-baseline">
        <Image src={"/comment.svg"} alt="comment" width="10" height="10" />
        <div className="ml-1">
          {comments}
        </div>
      </div>
    </div>
  );
}
