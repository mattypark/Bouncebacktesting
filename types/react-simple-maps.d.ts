declare module "react-simple-maps" {
  import { ComponentType, ReactNode, CSSProperties } from "react";

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: { scale?: number; center?: [number, number]; rotate?: [number, number, number] };
    width?: number;
    height?: number;
    style?: CSSProperties;
    children?: ReactNode;
  }

  interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: Geography[] }) => ReactNode;
  }

  interface Geography {
    rsmKey: string;
    id: string;
    properties: Record<string, unknown>;
  }

  interface GeographyProps {
    geography: Geography;
    key?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    onMouseEnter?: (event?: React.MouseEvent) => void;
    onMouseLeave?: (event?: React.MouseEvent) => void;
    onClick?: (event?: React.MouseEvent) => void;
    style?: {
      default?: CSSProperties;
      hover?: CSSProperties;
      pressed?: CSSProperties;
    };
  }

  interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
    key?: string;
  }

  interface AnnotationProps {
    subject: [number, number];
    dx?: number;
    dy?: number;
    children?: ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<MarkerProps>;
  export const Annotation: ComponentType<AnnotationProps>;
}
