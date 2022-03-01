import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import qs from 'qs';

import { Wrapper, Card, Templates, Form, Button } from './styles';
import Logo from '../../assets/images/logo.svg';

import { ITemplates } from './types';

export function Home() {
  const [templates, setTemplates] = useState<ITemplates[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplates | null>();
  const [boxes, setBoxes] = useState<Array<String>>([]);

  useEffect(() => {
    (async () => {
      const resp = await fetch('https://api.imgflip.com/get_memes');
      const {
        data: { memes },
      } = await resp.json();
      setTemplates(memes);
    })();
  }, []);

  const handleInputChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValues = boxes;
      newValues[index] = event.target.value;
      setBoxes(newValues);
    };

  function handleSelectTemplate(template: ITemplates) {
    setSelectedTemplate(template);
    setBoxes([]);
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const params = qs.stringify({
      template_id: selectedTemplate?.id,
      username: 'vikayel543',
      password: 'vikayel543',
      boxes: boxes.map((text) => ({ text })),
    });
  }

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
              onClick={() => handleSelectTemplate(template)}
              className={template.id === selectedTemplate?.id ? 'selected' : ''}
            >
              <img src={template.url} alt={template.name} />
            </button>
          ))}
        </Templates>

        {selectedTemplate && (
          <>
            <h2>Textos</h2>
            <Form onSubmit={handleSubmit}>
              {new Array(selectedTemplate.box_count)
                .fill('')
                .map((voidPosition, index) => (
                  <input
                    key={String(Math.random())}
                    placeholder={`Texto #${index + 1}`}
                    onChange={handleInputChange(index)}
                  />
                ))}
              <Button type="submit">Make My Meme!</Button>
            </Form>
          </>
        )}
      </Card>
    </Wrapper>
  );
}
