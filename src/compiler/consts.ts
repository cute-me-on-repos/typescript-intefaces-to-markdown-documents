

export const MDJSAPITemplate = `
$__desc__$

## API Params

$__api_params_desc__$

| Thuộc tính | Kiểu dữ liệu | Bắt buộc | Default | Mô tả |
| ---------- | ------------ | :------: | ----- | ----- |
$__api_params_table__$

### Callback success function payload

$__success_payload_desc__$

| Thuộc tính | Kiểu dữ liệu | Default | Mô tả |
| ---------- | ------------ | ----- | ----- |
$__success_payload_table__$

## Returns

$__returns_payload_desc__$
$__returns_payload_table__$
`;

export const mapDataToTemplate = ({desc,paramsDesc,paramsTable,payloadDesc,payloadTable,returnsDesc,returnsTable}: {
    desc: string, paramsDesc: string,
    paramsTable: string, payloadDesc: string,
    payloadTable: string, returnsDesc: string,
    returnsTable: string
}) => {
    
    let mdString = `${MDJSAPITemplate}`;
    mdString = mdString.replace('$__desc__$', desc);
    mdString = mdString.replace('$__api_params_desc__$', paramsDesc);
    mdString = mdString.replace('$__api_params_table__$', paramsTable);
    mdString = mdString.replace('$__success_payload_desc__$', payloadDesc);
    mdString = mdString.replace('$__success_payload_table__$', payloadTable);
    mdString = mdString.replace('$__returns_payload_desc__$', returnsDesc);
    mdString = mdString.replace('$__returns_payload_table__$', returnsTable); 
    if(!returnsTable && !returnsDesc){
        mdString = mdString.replace('## Returns','')
    }

    return mdString;
}