import React from 'react';

export async function generateStaticParams() {
    const res = await fetch('https://nexiblesapp.barecms.com/api/pages');
    const data = await res.json();

    return data.data.map(page => ({
        slug: page.title.toLowerCase().replace(/\s+/g, '-')
    }));
}

async function getPageData(slug) {
    const res = await fetch('https://nexiblesapp.barecms.com/api/pages');
    const data = await res.json();

    return data.data.find(page =>
        page.title.toLowerCase().replace(/\s+/g, '-') === slug
    );
}

export default async function Page({ params }) {
    const page = await getPageData(params.slug);

    if (!page) {
        return <h1>Page Not Found</h1>;
    }

    return (
        <div className="mt-[4rem]">
            {/* <h1>{page.title}</h1> */}
            {/* <p>{page.metadescription}</p> */}
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
    );
}
