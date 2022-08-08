import qs from 'qs'
import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react'
import { toast } from 'react-toastify'

import Logo from '../../assets/images/logo.svg'
import { Wrapper, Card, Templates, Form, Button, Footer } from './styles'
import { ITemplates } from './types'

export const Home = () => {
  const [templates, setTemplates] = useState<ITemplates[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplates | null>()
  const [boxes, setBoxes] = useState<Array<string>>([])
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const resp = await fetch('https://api.imgflip.com/get_memes')
      const {
        data: { memes },
      } = await resp.json()
      setTemplates(memes)
    })()
  }, [])

  const handleInputChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValues = boxes
      newValues[index] = event.target.value
      setBoxes(newValues)
    }

  function handleSelectTemplate(template: ITemplates) {
    setSelectedTemplate(template)
    setBoxes([])
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    const params = qs.stringify({
      template_id: selectedTemplate?.id,
      username: 'vikayel543',
      password: 'vikayel543',
      boxes: boxes.map((text) => ({ text })),
    })

    const resp = await fetch(`https://api.imgflip.com/caption_image?${params}`)
    const {
      data: { url },
    } = await resp.json()

    if (resp.status === 200 && resp.ok === true) {
      toast('🎉 MEME CREATED!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    setGeneratedMeme(url)
  }

  function handleReset() {
    setSelectedTemplate(null)
    setBoxes([])
    setGeneratedMeme(null)
  }

  return (
    <Wrapper>
      <img src={Logo} alt="MemeMaker" />
      <Card>
        {generatedMeme && (
          <>
            <img src={generatedMeme} alt="Generated Meme" />
            <Button type="button" onClick={handleReset}>
              Create new Meme!
            </Button>
          </>
        )}
        {!generatedMeme && (
          <>
            <h2>Select a template</h2>

            <Templates>
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelectTemplate(template)}
                  className={
                    template.id === selectedTemplate?.id ? 'selected' : ''
                  }
                >
                  <img src={template.url} alt={template.name} />
                </button>
              ))}
            </Templates>

            {selectedTemplate && (
              <>
                <h2>Texts</h2>
                <Form onSubmit={handleSubmit}>
                  {new Array(selectedTemplate.box_count)
                    .fill('')
                    .map((voidPosition, index) => (
                      <input
                        key={String(Math.random())}
                        placeholder={`Text #${index + 1}`}
                        onChange={handleInputChange(index)}
                      />
                    ))}
                  <Button type="submit">Make My Meme!</Button>
                </Form>
              </>
            )}
          </>
        )}
      </Card>
      <Footer>
        folow me{' '}
        <a
          href="https://github.com/nikolaslopes"
          target="_blank"
          rel="noreferrer"
        >
          @nikolaslopes
        </a>{' '}
        :)
      </Footer>
    </Wrapper>
  )
}
