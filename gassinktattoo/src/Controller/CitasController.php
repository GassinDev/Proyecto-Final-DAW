<?php

namespace App\Controller;

use App\Entity\Cita;
use App\Entity\Cliente;
use App\Repository\CitaRepository;
use App\Repository\ClienteRepository;
use App\Repository\TatuajeRepository;
use DateTime;
use DateTimeZone;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CitasController extends AbstractController
{
    #[Route('/crearCita', name: 'crearCita')]
    public function crearCita(Request $request, Security $security, CitaRepository $citaRepository, TatuajeRepository $tatuajeRepository, ClienteRepository $clienteRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        //CORREGIDO PROBLEMAS DE DIFERENCIAS HORARIAS 
        $start = new DateTime($data['start']);
        $start->setTimezone(new DateTimeZone('Europe/Madrid'));

        $end = new DateTime($data['end']);
        $end->setTimezone(new DateTimeZone('Europe/Madrid'));

        //CREAMOS UNA INSTANCIA DE CITA PARA IR ASIGNANDO LOS DATOS DE LA RESPUESTA JSON
        $cita = new Cita();
        $cita->setDateInicio($start);
        $cita->setDateFin($end);

        $worker = $security->getUser();
        if ($worker instanceof Cliente) {
            $cita->setWorker($worker);
        }

        $tatuajeName = $data['nameTatuaje'];
        $tatuaje = $tatuajeRepository->findOneBy(['name' => $tatuajeName]);

        $usernameCliente = $data['usernameCliente'];
        $cliente = $clienteRepository->findOneBy(['username' => $usernameCliente]);

        $cita->setTatuaje($tatuaje);
        $cita->setCliente($cliente);
        $cita->setDescription($data['description']);

        $citaRepository->save($cita);

        return new JsonResponse(['mensaje' => 'Cita creada con éxito'], Response::HTTP_OK);
    }

    #[Route('/mostrarCitas', name: 'mostrarCitas')]
    public function mostrarCitas(Security $security, CitaRepository $citaRepository): Response
    {
        $worker = $security->getUser();
        if ($worker instanceof Cliente) {
            $citas = $citaRepository->findBy(['worker' => $worker->getId()]);
            $citasData = [];

            foreach ($citas as $cita) {
                $citaData = [
                    'id' => $cita->getId(),
                    'dateInicio' => $cita->getDateInicio()->format('Y-m-d H:i:s'),
                    'dateFin' => $cita->getDateFin()->format('Y-m-d H:i:s'),
                    'clienteUsername' => $cita->getCliente()->getUsername(),
                    'description' => $cita->getDescription(),
                    'nameTatuaje' => $cita->getTatuaje()->getName(),
                    'imageTatuaje' => $cita->getTatuaje()->getImage()
                ];

                $citasData[] = $citaData;
            }

            $response = new JsonResponse($citasData);
            return $response;
        }

        return new JsonResponse([]);
    }

    #[Route('/eliminarCita/{id}', name: 'eliminarCita', methods: ['DELETE'])]
    public function eliminarCita(int $id, Security $security, CitaRepository $citaRepository): Response
    {
        $worker = $security->getUser();

        $cita = $citaRepository->findOneBy(['id' => $id, 'worker' => $worker]);

        if ($cita) {
            $citaRepository->remove($cita);

            return new JsonResponse(['mensaje' => 'Cita eliminada con éxito'], Response::HTTP_OK);
        }

        return new JsonResponse(['mensaje' => 'Cita no encontrada o no autorizada'], Response::HTTP_NOT_FOUND);
    }

    #[Route('/mostrarCitasTrabajadores/{workerName}', name: 'mostrarCitasTrabajadores')]
    public function mostrarCitasTrabajadores(string $workerName, CitaRepository $citaRepository, ClienteRepository $clienteRepository): Response
    {
        $worker = $clienteRepository->findOneBy(['username' => $workerName]);
        
        $citas = $citaRepository->findBy(['worker' => $worker]);

        return $this->json($citas);
    }
}
