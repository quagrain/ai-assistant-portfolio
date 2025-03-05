interface Props {
  skill: string;
}

export default function SkillCard({ skill }: Props) {
  return (
    <div className="rounded-lg border bg-card p-4 text-center shadow-sm">
      <p className="font-medium hover:cursor-alias">{skill}</p>
    </div>
  );
}
