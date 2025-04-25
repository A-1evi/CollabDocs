import Card from "./ui/Card";

const DocumentCard = ({ title, lastEdited }) => {
  return (
    <Card
      title={title}
      lastEdited={lastEdited}
      className="hover:border-primary/50 transition-all hover:shadow-md cursor-pointer"
    />
  );
};

export default DocumentCard;
