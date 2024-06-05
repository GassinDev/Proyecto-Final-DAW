<?php

namespace App\Controller\Apis;

use App\Entity\Carrito;
use App\Entity\Cliente;
use App\Repository\CarritoRepository;
use App\Repository\ClienteRepository;
use App\Repository\MerchandisingRepository;
use App\Repository\ProductoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CarritoController extends AbstractController
{
    //RUTA PARA AÑADIR ARTICULOS AL CARRITO, AJUSTADO PARA QUE FUNCIONE TANTO PARA MERCHANDISING COMO PARA PRODUCTOS - MEDIANTE VALIDACIONES
    #[Route('/api/cart/add', name: 'ad_to_carrito', methods: ['POST'])]
    public function addToCart(Request $request, Security $security, CarritoRepository $carritoRepository, ClienteRepository $clienteRepository, MerchandisingRepository $merchandisingRepository, ProductoRepository $productoRepository): Response
    {
        // DECODIFICAR LOS DATOS JSON RECIBIDOS EN LA SOLICITUD
        $data = json_decode($request->getContent(), true);

        // OBTENER EL CLIENTE AUTENTICADO Y LUEGO SU ID
        $cliente = $security->getUser();

        // COMPROBAMOS QUE $CLIENTE ES UNA INSTANCIA DE CLIENTE
        if ($cliente instanceof Cliente) {
            $clienteId = $cliente->getId();
        } else {
            return new Response('Cliente no autenticado.', Response::HTTP_UNAUTHORIZED);
        }

        // OBTENEMOS LOS IDS DEL ARRAY DE DATOS
        $merchanId = $data['merchanId'] ?? null;
        $productoId = $data['productoId'] ?? null;
        $quantity = $data['quantity'];
        $size = $data['size'] ?? null;

        // BUSCAMOS LAS ENTIDADES EN LA BASE DE DATOS
        $cliente = $clienteRepository->find($clienteId);

        if ($merchanId) {
            $articuloId = $merchanId;
            $merchan = $merchandisingRepository->find($articuloId);

            // BUSCAMOS EL ARTÍCULO EN EL CARRITO
            $carritoArticuloExistente = $carritoRepository->findOneBy(['cliente' => $cliente, 'merchandising' => $merchan, 'size' => $size]);
        } else {
            $articuloId = $productoId;
            $producto = $productoRepository->find($articuloId);

            // BUSCAMOS EL ARTÍCULO EN EL CARRITO
            $carritoArticuloExistente = $carritoRepository->findOneBy(['cliente' => $cliente, 'producto' => $producto]);
        }

        if ($carritoArticuloExistente) {
            // SI EL ARTÍCULO YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
            $carritoArticuloExistente->setQuantity($carritoArticuloExistente->getQuantity() + $quantity);
            $carritoRepository->save($carritoArticuloExistente);
        } else {
            // SI EL ARTÍCULO NO ESTÁ EN EL CARRITO, CREAMOS UNA NUEVA INSTANCIA
            $carrito = new Carrito();
            $carrito->setCliente($cliente);
            $carrito->setQuantity($quantity);

            if (isset($merchan)) {
                $carrito->setMerchandising($merchan);
                $carrito->setSize($size);
            } else {
                $carrito->setProducto($producto);
            }

            // GUARDAR EL PRODUCTO EN EL CARRITO DE LA BASE DE DATOS
            $carritoRepository->save($carrito);
        }

        return new Response();
    }

    #[Route('/api/cart/show', name: 'show_carrito', methods: ['GET'])]
    public function showCart(CarritoRepository $carritoRepository, Security $security): Response
    {
        $cliente = $security->getUser();
        $articulos = $carritoRepository->findBy(['cliente' => $cliente]);

        //ARRAY PARA SEPARAR LOS DOS TIPOS DE ARTICULOS PARA BUSCARLOS EN SUS TABLAS
        $productos = [];
        $merchandising = [];

        foreach ($articulos as $articulo) {

            $producto = $articulo->getProducto();
            $merchan = $articulo->getMerchandising();

            // VERIFICAMOS SI ES PRODUCTO
            if ($producto !== null) {
                //OBTENERMOS LOS DETALLES COMPLETOS DE EL ARTICULO DESDE LA RELACION EN LA TABLA CARRITO
                $productoCompleto = [
                    'id' => $producto->getId(),
                    'name' => $producto->getName(),
                    'image' => $producto->getImage(),
                    'price' => $producto->getPrice(),
                    'quantity' => $articulo->getQuantity()
                ];

                $productos[] = $productoCompleto;
            }

            // Verificar si el artículo es un merchandising
            if ($merchan !== null) {
                // Obtener los detalles completos del merchandising desde la relación en la entidad Carrito
                $merchanCompleto = [
                    'id' => $merchan->getId(),
                    'name' => $merchan->getName(),
                    'image' => $merchan->getImage(),
                    'price' => $merchan->getPrice(),
                    'size' => $articulo->getSize(), // Talla en el carrito
                    'quantity' => $articulo->getQuantity() // Cantidad en el carrito
                ];

                $merchandising[] = $merchanCompleto;
            }
        }

        return $this->json([
            'productos' => $productos,
            'merchandising' => $merchandising,
        ]);
    }

    #[Route('/api/removeArticleCart/{idArticulo}', name: 'removeArticleCart', methods: ['DELETE'])]
    public function removeArticleCart(int $idArticulo, CarritoRepository $carritoRepository, Security $security): Response
    {
        $cliente = $security->getUser();

        $productoCarrito = $carritoRepository->findOneBy(['cliente' => $cliente, 'producto' => $idArticulo]);
        $merchandisingCarrito = $carritoRepository->findOneBy(['cliente' => $cliente, 'merchandising' => $idArticulo]);

        if ($productoCarrito) {
            $carritoRepository->remove($productoCarrito);
        }else{
            $carritoRepository->remove($merchandisingCarrito);
        }

        return new JsonResponse(['message' => 'Articulo eliminado del carrito'], Response::HTTP_NO_CONTENT);
    }
}
