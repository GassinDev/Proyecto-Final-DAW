<?php

namespace App\Controller;

use App\Entity\Cita;
use App\Entity\Cliente;
use App\Repository\CitaRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CitasController extends AbstractController
{
    #[Route('/crearCita', name: 'crearCita')]
    public function crearCita(Request $request,Security $security, CitaRepository $citaRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        //CREAMOS UNA INSTANCIA DE CITA PARA IR ASIGNANDO LOS DATOS DE LA RESPUESTA JSON
        $cita = new Cita();
        $cita->setDateInicio(new \DateTime($data['start']));
        $cita->setDateFin(new \DateTime($data['end']));
        $cita->setState(false);

        $worker = $security->getUser();
        if($worker instanceof Cliente){
            $cita->setWorkerName($worker->getUsername());
        }
        
        $citaRepository->save($cita);

        return new JsonResponse(['mensaje' => 'Cita creada con éxito'], Response::HTTP_OK);
    }

    #[Route('/mostrarCitas', name: 'mostrarCitas')]
    public function mostrarCitas(Security $security, CitaRepository $citaRepository): Response
    {
        $worker = $security->getUser();
        if($worker instanceof Cliente){
            $citas = $citaRepository->findBy(['workerName' => $worker->getUsername()]); 
        }

        return $this->json($citas);
    }
}
