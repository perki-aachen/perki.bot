export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html>
      <link href="./../index.css" rel="stylesheet"></link>
      <body>{props.children}</body>
    </html>
  );
}
