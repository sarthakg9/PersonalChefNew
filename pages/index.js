import Head from 'next/head'
import Image from 'next/Image'
import styles from '/styles/Home.module.css'
import mainImage from '/assets/images/test.jpg'
import { Button, Form, Spinner } from 'react-bootstrap'

import { FormEvent, useState } from 'react'

export default function Home() {

  const [recipe, setRecipe] = useState("");
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [recipeLoadingError, setRecipeLoadingError] = useState(false);
  const [recipe1, setRecipe1] = useState("");
  const [recipe2, setRecipe2] = useState("");
  const [recipe3, setRecipe3] = useState("");


  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const prompt = formData.get("prompt")?.toString().trim();

    if (prompt) {
      try {
        setRecipe("");
        setRecipeLoadingError(false);
        setRecipeLoading(true);

        const response = await fetch("/api/recipe?prompt=" + encodeURIComponent(prompt));
        const body = await response.json();
        setRecipe(body.recipe);
        setRecipe1(body.recipe1);
        setRecipe2(body.recipe2);
        setRecipe3(body.recipe3);



      } catch (error) {
        console.error(error);
        setRecipeLoadingError(true);
      }finally{
        setRecipeLoading(false);
      }

    }

  }



  return (
    <div className="container">
      <Head>
        <title>PersonalChef</title>
        <meta name="description" content="by Sar.gasm" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className = {styles.main}>
        <h1>ChefAI</h1>
        <h2>
          powered by GPT-3
        </h2>
        <div>
          Write something and GPT-3 will suggest a food recipe to you.
        </div>
        <div className = {styles.mainImageContainer}>
          <Image 
          src = {mainImage}
          fill
          alt ='a picture of a robot in a kitchen'
          priority
          className={styles.mainImage}
          />
        </div>
        <Form onSubmit = {handleSubmit} className = {styles.inputForm}>
          <Form.Group className='mb-3' controlId = 'prompt-input'>
            <Form.Label>What are you thinking?</Form.Label>
            <Form.Control 
            name = 'prompt'
            placeholder = 'e.g. indian veg breakfast, simple arabic snacks'
            maxLength = {100}
            
            />
          </Form.Group>
          <Button type = 'submit' className='mb-3' disabled = {recipeLoading}>
            Suggest me a recipe
          </Button>
        </Form>
        { recipeLoading && <Spinner animation='border' /> }
        {recipeLoadingError && "Something went wrong. Please try again."}
        {recipe1 && <h5>{recipe1}</h5>}
        {recipe2 && <h6>{recipe2}</h6>}
        {recipe3 && <h6>{recipe3}</h6>}


      </main>

    </div>
  )
}
