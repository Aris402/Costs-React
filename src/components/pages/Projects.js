import Message from "../layout/Message"
import { Link, useLocation } from "react-router-dom"
import styles from './Projects.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"

function Projects(){
    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjects(data)
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <div>
            <div>
            <h1>Meus projetos</h1>
            <LinkButton to="newproject" text="Criar projeto"/>
            </div>
            {message && <Message msg={message} type="success"/>}
            <Container customClass="start">
                {projects.length > 0 &&
                  projects.map((project) =>
                  <ProjectCard
                  name={project.name}
                  id={project.id}
                  key={project.id}
                  budget={project.budget}
                  category={project.category.name}/>)}
            </Container>
        </div>
    )
}

export default Projects