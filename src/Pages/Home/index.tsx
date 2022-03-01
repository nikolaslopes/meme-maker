import { Wrapper, Card, Templates, Form, Button } from './styles';
import Logo from '../../assets/images/logo.svg';

export function Home() {
  return (
    <Wrapper>
      <img src={Logo} alt="MemeMaker" />
      <Card>
        <h2>Selecione um template</h2>

        <Templates>
          <button type="button">
            <img src={Logo} alt="Template 1" />
          </button>

          <button type="button">
            <img src="" alt="Template 1" />
          </button>

          <button type="button">
            <img src="" alt="Template 1" />
          </button>
        </Templates>

        <h2>Textos</h2>

        <Form>
          <input placeholder="Texto #1" />
          <input placeholder="Texto #2" />
          <input placeholder="Texto #3" />

          <Button type="submit">Make My Meme!</Button>
        </Form>
      </Card>
    </Wrapper>
  );
}
