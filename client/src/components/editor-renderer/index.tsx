import React from 'react'
import Blocks from 'editorjs-blocks-react-renderer';
import parse from 'html-react-parser';
import styles from './index.module.scss'
interface Props {
  data: any
  replacements?: { [key: string]: string }
}

interface IParagraph {
  data: any
  style: React.CSSProperties | undefined
  classNames: any
  config: any
}

export const EditorRenderer = ({ data, replacements }: Props) => {
  if (!data?.blocks) return <></>

  const CustomTableRenderer = ({ data }: any) => {
    console.log(data);

    return (
      <table className={styles.tableStyle}>
        <tbody>
          {data.content.map((row: any, rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((cell: any, cellIndex: number) => (
                <td key={cellIndex}>{parse(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const CustomParagraphRenderer = ({ data, className = "" }: any) => {
    let content = typeof data === 'string' ? data : data?.text;
    let replacedContent = content;

    const convertedContent = parse(replacedContent || '');

    return <p className={className}>{convertedContent}</p>;
  };


  const renderers = {
    paragraph: CustomParagraphRenderer,
    table: CustomTableRenderer,

  };


  return (
    <section className={styles.wrapper}><Blocks renderers={renderers} data={data} /></section>
  )
}
