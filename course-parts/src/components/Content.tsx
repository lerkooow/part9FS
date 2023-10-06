import Part from "./Part";

interface ContentProps {
  parts: {
    name: string;
    exerciseCount: number;
    description?: string;
    groupProjectCount?: number;
    backgroundMaterial?: string;
    kind: string;
    requirements?: string[];
  }[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
