interface PostCardProps {
  title: string;
}

export default function PostCard({ title }: PostCardProps) {
  return <div>{title}</div>;
}
