import Editable from "./Editable";

export default function Cover({ src, onChange, editable = false }) {
  return (
    <Editable
      type="cover"
      src={src}
      onChange={onChange}
      className={"h-36"}
      editable={editable}
    />
  );
}
