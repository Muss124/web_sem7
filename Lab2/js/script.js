ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
  );

const e = React.createElement;

// Отобразить <button> с текстом «Нравится»
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Нравится'
);