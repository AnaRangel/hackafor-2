import { useEffect, useState } from 'react';
import { VARIANT } from '@common';
import { Button, CardWrapper, Footer, Nav, Tag } from '@components';
import { createClient } from '@supabase/supabase-js';
import { Project } from './types';

const supabase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_API_KEY);

export const fetchProjects = () => {
  return supabase.from('Project').select();
};

export enum PROJECT_PAGE_STATUS {
  ACTIVE = 'Active',
  CLOSED = 'Closed'
}

export const Projects = () => {
  const [status, setStatus] = useState(PROJECT_PAGE_STATUS.ACTIVE);
  const [projects, setProjects] = useState<Project[] | null>([]);

  console.log(projects);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data.data);
    });
  }, []);

  // TODO: Create a Layout

  return (
    <>
      <Nav />
      {/* TODO: Change to FIGMA element */}

      {/* Projects */}
      <article id="projects">
        <main className="relative  z-2 w-full max-w-7xl mx-auto gap-y-[72px] font-dmsans text-white px-5">
          <div className="flex w-full justify-center pt-40 gap-8 text-white">
            <Button
              onClick={() => {
                setStatus(PROJECT_PAGE_STATUS.ACTIVE);
              }}
              variant={status === PROJECT_PAGE_STATUS.ACTIVE ? VARIANT.PRIMARY : VARIANT.SECONDARY}
            >
              Activos
            </Button>
            <Button
              onClick={() => {
                setStatus(PROJECT_PAGE_STATUS.CLOSED);
              }}
              variant={status === PROJECT_PAGE_STATUS.CLOSED ? VARIANT.PRIMARY : VARIANT.SECONDARY}
            >
              Cerrados
            </Button>
          </div>

          {/* TODO: Mostrar proyectos activos o cerrados en base a un filter */}

          {status === PROJECT_PAGE_STATUS.ACTIVE ? (
            <div className="grid grid-cols-3 gap-6 pt-40">
              {projects?.map((project) => (
                <CardWrapper key={project.id} className="flex flex-col gap-8">
                  <h1 className="font-bold text-[32px]">{project.name}</h1>
                  <p className="text-[16px] text-balance ">{project.description}</p>
                  <div className="flex flex-col gap-4">
                    <p className="text-[16px] font-bold">Participantes</p>
                    <ul className="flex flex-nowrap gap-4 text-[14px]">
                      <Tag>{project.administrator.role}</Tag>
                      {project.members.map((member, index) => (
                        <Tag key={index}>{member.role}</Tag>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-4">
                    {/* TODO: Filtrar si está buscando antes del texto */}
                    {/* projects.map(project => { const x = ...; return (tuscosas)}) */}
                    <p className="text-[16px] font-bold">Estamos buscando</p>
                    <ul className="flex flex-nowrap gap-4 text-[14px]">
                      {Object.entries(project.required_roles)
                        .filter(([, quantity]) => quantity > 0)
                        .map(([role]) => (
                          <Tag>{role}</Tag>
                        ))}
                    </ul>
                  </div>
                  <div className="w-full flex justify-center">
                    <Button className="w-fit">Contactar</Button>
                  </div>
                </CardWrapper>
              ))}
            </div>
          ) : (
            <p>Proyectos cerrados</p>
          )}
        </main>
        <Footer />
      </article>
    </>
  );
};
