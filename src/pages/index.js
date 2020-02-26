import React from "react"
import { Link, useStaticQuery } from "gatsby"

import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import "./index.css"

const IndexPage = () => {
  const results = useFetchCandidates()
  const candidates =
    results &&
    results.candidates &&
    results.candidates.edges.map(c => c.node.data)
  // console.log(
  //   candidates.map(
  //     candidate => candidate.Image.localFiles[0].childImageSharp.fixed
  //   )
  // )
  return (
    <Layout>
      <SEO title="Home" />
      <div id="candidate-directory">
        {candidates.map(candidate => (
          <div className="candidate">
            <div className="candidate-img">
              <Img
                alt={candidate.Name}
                fixed={candidate.Image.localFiles[0].childImageSharp.fixed}
              />
            </div>

            <h3>{candidate.Name}</h3>
            <h4>{candidate.Office}</h4>
            <div className="bio">{candidate.Bio}</div>
            <div className="links">
              <a href={candidate.Facebook}>FB</a>
              <a href={candidate.Twitter}>Tw</a>
              <a href={candidate.RFS}>RFS</a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

function useFetchCandidates() {
  return useStaticQuery(graphql`
    query Candidates {
      candidates: allAirtable {
        edges {
          node {
            id
            data {
              Name
              Bio
              Office
              Facebook
              Twitter
              Website
              RFS
              Actblue
              Image {
                localFiles {
                  childImageSharp {
                    fixed(
                      width: 200
                      height: 200
                      fit: CONTAIN
                      background: "black"
                    ) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
}
