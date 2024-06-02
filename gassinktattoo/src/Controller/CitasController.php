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
    public function crearCita(Request $request, Security $security, CitaRepository $citaRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        //CREAMOS UNA INSTANCIA DE CITA PARA IR ASIGNANDO LOS DATOS DE LA RESPUESTA JSON
        $cita = new Cita();
        $cita->setDateInicio(new \DateTime($data['start']));
        $cita->setDateFin(new \DateTime($data['end']));
        $cita->setRealized(false);

        $worker = $security->getUser();
        if ($worker instanceof Cliente) {
            $cita->setWorkerName($worker->getUsername());
        }
        $cita->setClienteUsername($data['usernameCliente']);
        $cita->setDescription($data['description']);

        $citaRepository->save($cita);

        return new JsonResponse(['mensaje' => 'Cita creada con éxito'], Response::HTTP_OK);
    }

    #[Route('/mostrarCitas', name: 'mostrarCitas')]
    public function mostrarCitas(Security $security, CitaRepository $citaRepository): Response
    {
        $worker = $security->getUser();
        if ($worker instanceof Cliente) {
            $citas = $citaRepository->findBy(['workerName' => $worker->getUsername()]);
        }

        return $this->json($citas);
    }

    #[Route('/eliminarCita/{id}', name: 'eliminarCita', methods: ['DELETE'])]
    public function eliminarCita(int $id, Security $security, CitaRepository $citaRepository): Response
    {
        $worker = $security->getUser();
        if ($worker instanceof Cliente) {
            $cita = $citaRepository->findOneBy([
                'id' => $id,
                'workerName' => $worker->getUsername()
            ]);

            if ($cita) {
                $citaRepository->remove($cita);

                return new JsonResponse(['mensaje' => 'Cita eliminada con éxito'], Response::HTTP_OK);
            }

            return new JsonResponse(['mensaje' => 'Cita no encontrada o no autorizada'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse();
    }
}
