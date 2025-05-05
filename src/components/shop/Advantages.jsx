export default function Advantages() {
  return (
    <div className="mb-4 h-auto">
      <div className="md:flex justify-center">
        <div className="md:w-1/2 w-full p-2">
          <div className="mb-4">
            <h2 className="text-gray-900 text-4xl font-bold">
              <strong>NEXIBLES </strong>
              <span className="font-semibold">advantage...</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-gray-900 mb-4">
              With an efficient team of experts and experienced professionals,
              we provide converters and end-users with a wide range of custom
              flexible packaging solutions, including pouches, shrink sleeves,
              labels, and roll stock. Our broad range of product packaging
              solutions enables us to meet the demands of a diverse range of
              market segments.
            </p>
            <p className="text-gray-900 mb-4">
              Our in-house Quality Control lab also ensures that each produced
              batch satisfies the most stringent quality requirements that the
              industry demands and the product deserves.
            </p>
            <p className="text-gray-900">
              A fully equipped in-house pre-press division translates into
              quality of design & layouts, all under the qualified and watchful
              eyes of our team.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full mt-8">
          <img
            // src={`${process.env.PUBLIC_CDN_URL}/aboutimage.jpg`}
            src={`${process.env.NEXT_PUBLIC_CDN_URL}/aboutimage.jpg`}
            alt="banner_img"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
