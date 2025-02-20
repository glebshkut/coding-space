import React, { useEffect } from "react"
import { Helmet } from "react-helmet"

import solutionLottie from "../assets/animated_illustrations/solution_animation.json"
import Hero from "../components/homepage/Hero"
import Card from "../components/reusable/Card"
import SkeletonCard from "../components/skeletons/SkeletonCard"
import Icons from "../components/SvgIcons/Icons"
import { analytics, logEvent } from "../firebase/config"
import { useCollection } from "../hooks/useCollection"

const Solutions = () => {
  const { documents, isLoading } = useCollection(
    "solutions",
    ["completed", "==", true],
    null,
    ["createdAt", "desc"]
  )

  useEffect(() => {
    logEvent(analytics, "solutions_page_visited")
  }, [])
  return (
    <>
      <Helmet>
        <title>FrontendPro - Solutions</title>
      </Helmet>
      <div className="mb-6 md:mb-0 px-5 row-start-2 row-end-3 col-start-2 col-end-3">
        <Hero
          title="What's stopping you from moving forward? All the solutions you need are right here!"
          subTitle="Welcome To FrontendPro 😊"
          mainImg={solutionLottie}
          btnTitle="My Solutions "
          route="/mysolutions"
          icon={<Icons.ArrowRight className="ml-2 -mr-1" />}
          lottie
        />
        <main>
          <h1 className="text-5xl heading text-center font-extrabold text-white">
            Solutions
          </h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-8">
            {!isLoading
              ? documents.map((solution) => {
                  return <Card key={solution.id} card={solution} isSolution />
                })
              : [1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard isSolution key={n} />)}
          </div>
        </main>
      </div>
    </>
  )
}

export default Solutions
