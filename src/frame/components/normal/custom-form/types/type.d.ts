declare namespace CustomForm {
  type GridItemProps = {
    x: number;
    y: number;
    w: number;
    h: number;
    // 唯一标识
    i: string | number;
  }
  
  type ComponentProps = {
    eType: string;
    label: string;
    prop: string;
  
    props?: any;
  }

  type ComponentItem = GridItemProps & ComponentProps
}

