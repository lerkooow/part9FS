interface TotalProps {
    parts: {
     name: string;
     exerciseCount: number;
    }[]
   }

const Content = (props: TotalProps) => {
    return (
    <p>
        Number of exercises{" "}
        {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
    );
};

export default Content;