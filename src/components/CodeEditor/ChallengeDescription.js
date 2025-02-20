import { Image, Placeholder } from "cloudinary-react"

const ChallengeDescription = ({ solution }) => {
  return (
    <div className="bg-gray-800 h-full px-4 py-2 overflow-y-auto no-scrollbar">
      <h1 className="font-bold text-xl text-white mb-2">{solution?.title}</h1>
      <p className="text-sm text-gray-300 mb-4">{solution?.description}</p>
      <Image
        className="w-full"
        cloudName="di5hmgowi"
        alt={`${solution?.title} Challenge`}
        loading="lazy"
        public-id={solution?.images?.desktop || solution?.images?.cover}
      >
        <Placeholder type="pixelate" />
      </Image>
      <h2 className="mt-4 mb-2 text-white text-lg font-medium">
        Users should be able to:
      </h2>
      <ul className="text-sm text-gray-300 list-disc pl-4">
        {solution.requirements.map((requirement, index) => (
          <li key={index} className="mb-1">
            {requirement}
          </li>
        ))}
      </ul>
      {solution?.bonus && (
        <>
          <h2 className="mt-4 mb-2 text-white text-lg font-medium">Brownie Points</h2>
          <ul className="text-sm text-gray-300 list-disc pl-4">
            {solution?.bonus?.map((bonus, index) => (
              <li key={index} className="mb-1">
                {bonus}
              </li>
            ))}
          </ul>
        </>
      )}
      {solution?.resources && (
        <>
          <h2 className="mt-4 mb-2 text-white text-lg font-medium">Resources</h2>
          <ul className="text-sm text-gray-300 list-disc pl-4">
            {solution.resources.map((resource, index) => (
              <li key={index} className="mb-1">
                <a
                  href={resource.link}
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default ChallengeDescription
