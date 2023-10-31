interface NullDataParse {
  title: string;
}

const NullData: React.FC<NullDataParse> = ({ title }) => {
  return (
    <div className="flex w-full h-[50vh] items-center justify-center text-xl  md:rexr-2xl">
      <p>{title}</p>
    </div>
  );
};

export default NullData;
