import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const scene = req.body.scene || '';
  if (scene.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid location",
      }
    });
    return;
  }

  try {
    const temperature = Number(req.body.temperature) || 0.5;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(scene),
      max_tokens: 200,
      //temperature: 0.9,
      temperature: temperature,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(scene, style, character) {
  // const capitalizedSetting =
  //   scene[0].toUpperCase() + scene.slice(1).toLowerCase();
  // return `Suggest a setting and initial characters with names the cops meet at a crime scene in the 
  // style of Arthur Conan Doyle, Agatha Christie, H.P. Lovecraft, or Raymond Chandler
  // `
  // Setting: Living Space
  // Names: dirty brownstone, luxury penthouse, small shop second-floor
  // Character: housewife: Martha Smith, retired craftsman: Bob Arthur, building supervisor: Art Danzel
  // Setting: Dirty Areas
  // Names: behind bar, dumpster, subway entrance
  // Character: barkeeper: Jack Finias, homeless person: Steve Fox, delivery boy: Bobby Tex
  // Setting: Roads
  // Names: bridge, secluded parking, alley
  // Character: truck driver: Miles Petersen, traffic cop: Isaac Harwood, commuting office worker: Hu Shi
  // Setting: ${capitalizedSetting}
  // Names:`
  // Write the opening scene to a crime mystery with a setting and initial characters with names the cops meet at a crime scene in the style of Arthur Conan Doyle, Agatha Christie, H.P. Lovecraft, or Raymond Chandler

  let prompt = `Suggest a setting and initial characters with names the cops meet at a crime scene in the 
  style of Arthur Conan Doyle, Agatha Christie, Dashiell Hammet, P.D. James, or Raymond Chandler`

  if (style === "Agatha Christie"){
    prompt += 
    `
    Setting: ${scene}
    Character: ${character}
    style: ${style}
    `;
  } else if (style === "Raymond Chandler"){
    prompt += 
    `
    Setting: ${scene}
    Character: ${character}
    style: ${style}
    `;
  }else if (style === "P.D. James"){
    prompt += 
    `
    Setting: ${scene}
    Character: ${character}
    style: ${style}
    `;
  } else if (style === "Dashiell Hammet"){
    prompt += 
    `
    Setting: ${scene}
    Character: ${character}
    style: ${style}
    `;
  } else {
    prompt += 
    `
    Setting: ${scene}
    Character: ${character}
    style: ${style}
    `;
  }
  return prompt;
}


