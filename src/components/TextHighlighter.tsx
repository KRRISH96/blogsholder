import * as React from 'react';

interface Props {
  text: string;
  highlight: string;
}
function TextHighlighter({ text, highlight }: Readonly<Props>) {
  // No point in splitting and doing magic when highlighter is empty :-P
  if (highlight === '') return <span>{text}</span>;

  // Split text into parts on highlight term, also ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? {
                  fontWeight: 'bold',
                  color: 'red',
                  backgroundColor: 'yellow',
                }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
}

export default TextHighlighter;
