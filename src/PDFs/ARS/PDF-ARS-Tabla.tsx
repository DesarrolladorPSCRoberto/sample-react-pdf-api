import React from 'react'; // 👈 Necesario para JSX
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import Row from './PDF-ARS-Tabla-Fila'
import { type TextStyles } from './PDF-ARS'

export interface ARSItem {
  ind_ars: number;
  ind_ars_detalle: number;
  item: string;
  descripcion: string;
  para_usar: string;
  id_unidad: string;
  precio_uni: number;
  Local: string;
  cantidad: number;
  cantidad_disponible: number;
  cantidad_ejecutada_orden: number;
  subtotal: number;
  impuesto: number;
  total: number;
  fecha_inicial: string; // Use string for date, or Date if you parse it
  fecha_final: string;   // Use string for date, or Date if you parse it
  duracion: number;
  observacion: string;
}
const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderRadius: 3,
  },
  tableHeader: {
    textAlign: 'left',
    paddingVertical: 5,
    flexDirection: 'row',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    marginTop: 20
  },
  headerCell: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 0.2,
    wordBreak: 'break-word', // Break long words
  },
  footerInfo: {
    backgroundColor: '#f0f8fe',
  },
  lastRow: {
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
  xd: {

  }
});
const columnWidths = StyleSheet.create({
  item: { flex: 1.3 },
  descripcion: { flex: 6, textAlign: 'left' },
  unidad: { flex: 1 },
  cCosto: { flex: 1.7 },
  cantidad: { flex: 1.7, textAlign: 'right' },
  precioUni: { flex: 2.5, textAlign: 'right' },
  impuestos: { flex: 2.5, textAlign: 'right' },
  valorTotal: { flex: 2.5, textAlign: 'right' },
  fechaInicio: { flex: 1 },
  fechaFin: { flex: 1 },
  bodega: { flex: 1.5 },
  observacion: { flex: 6, textAlign: 'left' },
});


interface BackgroundStyles {
  content: any;
  tableHeader: any;
  footerInfo: any;
}

interface PDF_TablaProps {
  backgroundStyles: BackgroundStyles;
  textStyles: TextStyles;
  generalStyles: any;
  items: ARSItem[];
}

const PDF_Tabla: React.FC<PDF_TablaProps> = ({ backgroundStyles, textStyles, items }) => {

  const options: {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  } = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };
  return (
    <View style={[styles.table, backgroundStyles.content]}>
      {/* Table Header */}
      <View fixed style={[styles.tableHeader, backgroundStyles.tableHeader, textStyles.tableHeader]}>
        <View style={[styles.headerCell, columnWidths.item, { textAlign: 'center' }]}>
          <Text >Item</Text>
        </View>
        <View style={[styles.headerCell, columnWidths.descripcion, { textAlign: 'center' }]}>
          <Text >Descripción</Text>
        </View>
        <View style={[styles.headerCell, columnWidths.unidad, { textAlign: 'center' }]}>
          <Text >Unidad</Text>
        </View>
        <View style={[styles.headerCell, columnWidths.cCosto, { textAlign: 'center' }]}>
          <Text >Centro de Costo</Text>
        </View>
        <View style={[styles.headerCell, columnWidths.cantidad, { textAlign: 'center' }]}>
          <Text >Cantidad</Text>
        </View>
        <View style={[styles.headerCell, columnWidths.precioUni, { textAlign: 'center' }]}>
          <Text >Precio Unitario</Text>
        </View>
        <View style={[styles.headerCell, columnWidths.impuestos, { textAlign: 'center' }]}>
          <Text >Impuestos</Text>
        </View>
        <View style={[styles.headerCell, columnWidths.valorTotal, { textAlign: 'center' }]}>
          <Text >Valor Total</Text>
        </View>
        <View style={[styles.headerCell, columnWidths.fechaInicio, { textAlign: 'center' }]}>
          <Text >Fecha Inicio</Text>
        </View>
        <View style={[styles.headerCell, columnWidths.fechaFin, { textAlign: 'center' }]}>
          <Text >Fecha Fin</Text>
        </View>
        <View style={[styles.headerCell, columnWidths.bodega, { textAlign: 'center' }]}>
          <Text >Bodega</Text>
        </View>
        <View style={[styles.headerCell, columnWidths.observacion, { textAlign: 'center' }]}>
          <Text >Observación</Text>
        </View>
      </View>
      {/* Table Rows */}
      <View style={{
        borderRight: '1px solid #324c68',
        borderLeft: '1px solid #324c68',
        borderBottom: '1px solid #324c68',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
      }}>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, idx) => (
            <Row
              lastRowStyle={idx === items.length - 1 ? styles.lastRow : styles.xd}
              textStyles={textStyles}
              columnWidths={columnWidths}
              key={idx}
              rowData={[
                item.item,
                item.descripcion,
                item.id_unidad,
                item.para_usar,
                item.cantidad_ejecutada_orden,
                item.precio_uni,
                item.impuesto,
                item.total,
                item.fecha_inicial
                  ? new Date(item.fecha_inicial).toLocaleDateString('en-GB', options).replace('/202', '/2')
                  : '',
                item.fecha_final
                  ? new Date(item.fecha_final).toLocaleDateString('en-GB', options).replace('/202', '/2')
                  : '',
                item.Local,
                item.observacion // Observación, adjust if you have a field for it
              ]}
            />
          ))
        ) : (
          <Text>No data available</Text>
        )}
      </View>


    </View>
  )
};

export default PDF_Tabla;
