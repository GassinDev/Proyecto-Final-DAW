<?php

namespace App\Controller;

use App\Entity\Cliente;
use App\Entity\Pedido;
use App\Entity\PedidoArticulos;
use App\Repository\CarritoRepository;
use App\Repository\ClienteRepository;
use App\Repository\PedidoArticulosRepository;
use App\Repository\PedidoRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PedidoController extends AbstractController
{
    #[Route('/pedido/show', name: 'pedidos_show')]
    public function getPedidos(PedidoRepository $pedidoRepository, Security $security): Response
    {

        $cliente = $security->getUser();

        // OBTENEMOS LOS PEDIDOS DEL CLIENTE ACTUAL
        $pedidos = $pedidoRepository->findBy(['cliente' => $cliente]);

        // Seleccionar manualmente los datos que deseas devolver
        $pedidosData = [];
        foreach ($pedidos as $pedido) {
            $pedidosData[] = [
                'status' => $pedido->getStatus(),
                'orderDate'=> $pedido->getOrderDate(),
                'price'=> $pedido->getPrice()
            ];
        }

        // Devuelve la respuesta JSON con los datos seleccionados
        return $this->json($pedidosData);
    }

    #[Route('/pedido/realizar', name: 'pedido_realizar')]
    public function realizarPedido(): Response
    {
        return $this->render('pages/realizarPedido.html.twig');
    }

    #[Route('/pedido/guardar', name: 'pedido_guardar')]
    public function guardarPedido(Request $request, Security $security, ClienteRepository $clienteRepository, PedidoRepository $pedidoRepository, CarritoRepository $carritoRepository, PedidoArticulosRepository $pedidoArticulosRepository, EntityManagerInterface $entityManagerInterface): Response
    {
        //RECIBIMOS LOS DATOS
        $data = json_decode($request->getContent(), true);

        // OBTENER EL CLIENTE AUTENTICADO Y LUEGO SU ID
        $cliente = $security->getUser();

        // COMPROBAMOS QUE $CLIENTE ES UNA INSTANCIA DE CLIENTE
        if ($cliente instanceof Cliente) {
            $clienteId = $cliente->getId();
        } else {
            return new Response('Cliente no autenticado.', Response::HTTP_UNAUTHORIZED);
        }

        // BUSCAMOS LAS ENTIDADES EN LA BASE DE DATOS
        $cliente = $clienteRepository->find($clienteId);

        //CREAMOS UNA INSTANCIA DE PEDIDO Y LA GUARDAMOS EN LA TABLA
        $pedido = new Pedido();
        $pedido->setNombreCompleto($data['nombre']);
        $pedido->setPhone($data['telefono']);
        $pedido->setCalle($data['calle']);
        $pedido->setCiudad($data['ciudad']);
        $pedido->setProvincia($data['provincia']);
        $pedido->setCp($data['cp']);
        $pedido->setPais($data['pais']);
        $pedido->setNumero($data['numero']);
        $pedido->setPrice($data['precio']);
        $pedido->setOrderDate(new DateTime());
        $pedido->setStatus('Pendiente');
        $pedido->setCliente($cliente);

        $pedidoRepository->save($pedido);

        // OBTENEMOS LOS PRODUCTOS DEL CARRITO
        $carritos = $carritoRepository->findBy(['cliente' => $cliente]);

        foreach ($carritos as $carrito) {

            $pedidoArticulo = new PedidoArticulos();
            $pedidoArticulo->setPedido($pedido);
            $pedidoArticulo->setQuantity($carrito->getQuantity());
            $pedidoArticulo->setSize($carrito->getSize());

            if ($carrito->getProducto()) {
                $pedidoArticulo->setProduct($carrito->getProducto());
            }

            if ($carrito->getMerchandising()) {
                $pedidoArticulo->setMerchandising($carrito->getMerchandising());
            }

            // GUARDAMOS EL ARTÍCULO DEL PEDIDO
            $pedidoArticulosRepository->save($pedidoArticulo);
        }

        //LIMPIAMOS EL CARRITO DESPUÉS DE CREAR EL PEDIDO
        foreach ($carritos as $carrito) {
            $entityManagerInterface->remove($carrito);
            $entityManagerInterface->flush();
        }

        return new Response('Pedido guardado correctamente', Response::HTTP_OK);
    }
}
