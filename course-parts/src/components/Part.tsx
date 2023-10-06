interface PartProps {
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
  
  const Part = (props: { part: PartProps["parts"][0] }) => {
    switch (props.part.kind) {
      case "basic":
        return (
          <div key={props.part.name}>
            <strong><p>
              {props.part.name} {props.part.exerciseCount}{" "}
            </p></strong>
            <em><p>{props.part.description}</p></em>
          </div>
        );
      case "group":
        return (
          <div key={props.part.name}>
            <strong><p>
              {props.part.name} {props.part.exerciseCount}{" "}
            </p></strong>
            <p>project exercises {props.part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div key={props.part.name}>
            <strong><p>
              {props.part.name} {props.part.exerciseCount}{" "}
            </p></strong>
            <em><p>{props.part.description}</p></em>
            <p>submit to {props.part.backgroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div key={props.part.name}>
            <strong><p>
              {props.part.name} {props.part.exerciseCount}{" "}
            </p></strong>
            <em><p>{props.part.description}</p></em>
            <p>required skils: {props.part.requirements?.join(", ")}</p>
          </div>
        );
      default:
        return null;
    }
  };
  
  export default Part;
  