import { useState, useEffect } from 'react';

import { Wrapper, Card, Templates, Form, Button } from './styles';
import Logo from '../../assets/images/logo.svg';

import { ITemplates } from './types';

export function Home() {
  const [templates, setTemplates] = useState<ITemplates[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplates | null>();

  console.log(selectedTemplate);

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://api.imgflip.com/get_memes');
      const {
        data: { memes },
      } = await resp.json();
      setTemplates(memes);
    })();
  }, []);

  return (
    <Wrapper>
      <img src={Logo} alt="MemeMaker" />
      <Card>
        <h2>Selecione um template</h2>

        <Templates>
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedTemplate(template)}
              className={template.id === selectedTemplate?.id ? 'selected' : ''}
            >
              <img src={template.url} alt={template.name} />
            </button>
          ))}
        </Templates>

        {selectedTemplate && (
          <>
            <h2>Textos</h2>
            <Form>
              <input placeholder="Texto #1" />
              <input placeholder="Texto #2" />
              <input placeholder="Texto #3" />

              <Button type="submit">Make My Meme!</Button>
            </Form>
          </>
        )}
      </Card>
    </Wrapper>
  );
}
