import estilo from '../../styles/Home.module.scss';

export default function Home() {
  return (
    <div>
      <h1 className={estilo.title}>
        Olá <span>Dev</span>!
      </h1>
    </div>
  );
}
