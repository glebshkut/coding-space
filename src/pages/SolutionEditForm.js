import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import fetchSkills from "../api"
import mainImg from "../assets/animated_illustrations/solution_animation.json"
import Hero from "../components/homepage/Hero"
import BaseInput from "../components/reusable/BaseInput"
import Button from "../components/reusable/Button"
import MultiSelectSearchInput from "../components/reusable/MultiSelectSearchInput"
import Icons from "../components/SvgIcons/Icons"
import { INPUTS, PLAYGROUND_INPUTS } from "../constants"
import { useDocument } from "../hooks/useDocument"
import { useFirestore } from "../hooks/useFirestore"

const SKILLS = [
  { name: "html" },
  { name: "css" },
  { name: "javascript" },
  { name: "bootstrap" },
  { name: "tailwind-css" },
  { name: "react" },
  { name: "vue" },
  { name: "angular" },
]

const INITIAL_STATE = {
  title: "",
  githubUrl: "",
  liveWebsiteUrl: "",
  tags: [],
  feedback: "",
}

const SolutionEditForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const { id } = useParams()
  const { document } = useDocument("solutions", id)
  const { updateDocument, response } = useFirestore("solutions")
  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.id === "playgroundLink") return

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  // handle form data
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateDocument(id, formData)
      if (!response.error) {
        navigate(`/solution/${id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renderInputs = (inputsArray) =>
    inputsArray.map((input) =>
      input.type === "search" ? (
        <MultiSelectSearchInput
          key={input.name}
          onChange={setFormData}
          fetchOptions={fetchSkills}
          predefinedOptions={SKILLS}
          label={input.label}
          selectedOptions={formData.tags}
        />
      ) : (
        <BaseInput
          key={input.name}
          label={input.label}
          value={
            input.name === "playgroundLink"
              ? `${window.location.origin}/playground/${document?.id}`
              : formData[input.name]
          }
          placeholder={input.placeholder}
          onChange={handleChange}
          {...input}
        />
      )
    )

  useEffect(() => {
    if (document) {
      setFormData(document)
    }
  }, [document])

  return (
    <div className="px-5 row-start-2 row-end-3 col-start-2 col-end-3">
      <Hero
        title="Master Web and Mobile Development by building real world projects"
        subTitle="Time to submit your solution and show it to the world 👍"
        mainImg={mainImg}
        btnTitle="Explore Solutions "
        route="/solutions"
        icon={<Icons.ArrowRight className="ml-2 -mr-1" />}
        lottie
      />
      <div className="w-full mx-auto mt-8">
        <form
          className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {document?.isPlayground
            ? renderInputs(PLAYGROUND_INPUTS)
            : renderInputs(INPUTS)}
          <div>
            <Button type="submit" className="font-medium" loading={response.isPending}>
              Update Solution
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SolutionEditForm
