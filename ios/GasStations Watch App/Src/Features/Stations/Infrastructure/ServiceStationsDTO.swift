import Foundation

struct ServiceStationsItemDTO: Codable {
    let bioetanol: String
    let esterMetilico: String
    let cp: String
    let direccion: String
    let horario: String
    let idCCAA: String
    let idEESS: String
    let idMunicipio: String
    let idProvincia: String
    let latitud: String
    let localidad: String
    let longitudWGS84: String
    let margen: String
    let municipio: String
    let precioBiodiesel: String
    let precioBioetanol: String
    let precioGasNaturalComprimido: String
    let precioGasNaturalLicuado: String
    let precioGasesLicuadosLP: String
    let precioGasoleoA: String
    let precioGasoleoB: String
    let precioGasoleoPremium: String
    let precioGasolina95E10: String
    let precioGasolina95E5Premium: String
    let precioGasolina95E5: String
    let precioGasolina98E10: String
    let precioGasolina98E5: String
    let precioHidrogeno: String
    let provincia: String
    let remision: String
    let rotulo: String
    let tipoVenta: String
    
    enum CodingKeys: String, CodingKey {
        case bioetanol = "% BioEtanol"
        case esterMetilico = "% Éster metílico"
        case cp = "C.P."
        case direccion = "Dirección"
        case horario = "Horario"
        case idCCAA = "IDCCAA"
        case idEESS = "IDEESS"
        case idMunicipio = "IDMunicipio"
        case idProvincia = "IDProvincia"
        case latitud = "Latitud"
        case localidad = "Localidad"
        case longitudWGS84 = "Longitud (WGS84)"
        case margen = "Margen"
        case municipio = "Municipio"
        case precioBiodiesel = "Precio Biodiesel"
        case precioBioetanol = "Precio Bioetanol"
        case precioGasNaturalComprimido = "Precio Gas Natural Comprimido"
        case precioGasNaturalLicuado = "Precio Gas Natural Licuado"
        case precioGasesLicuadosLP = "Precio Gases licuados del petróleo"
        case precioGasoleoA = "Precio Gasoleo A"
        case precioGasoleoB = "Precio Gasoleo B"
        case precioGasoleoPremium = "Precio Gasoleo Premium"
        case precioGasolina95E10 = "Precio Gasolina 95 E10"
        case precioGasolina95E5Premium = "Precio Gasolina 95 E5 Premium"
        case precioGasolina95E5 = "Precio Gasolina 95 E5"
        case precioGasolina98E10 = "Precio Gasolina 98 E10"
        case precioGasolina98E5 = "Precio Gasolina 98 E5"
        case precioHidrogeno = "Precio Hidrogeno"
        case provincia = "Provincia"
        case remision = "Remisión"
        case rotulo = "Rótulo"
        case tipoVenta = "Tipo Venta"
    }
}

struct ServiceStationsDTO: Codable {
    let fecha: String
    let listaEESSPrecio: [ServiceStationsItemDTO]
    let nota: String
    let resultadoConsulta: String
    
    enum CodingKeys: String, CodingKey {
        case fecha = "Fecha"
        case listaEESSPrecio = "ListaEESSPrecio"
        case nota = "Nota"
        case resultadoConsulta = "ResultadoConsulta"
    }
}
