import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productsData } = useGetProductsQuery();
  const { data: transactionsData } = useGetTransactionsQuery();
  // console.log("transaction data:", transactionsData);

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);
  const productsColumns = [
    {
      field: "_id",
      headerName: "ID",
      type: "string",
      flex: 1,
      // editable: true,
    },
    {
      field: "expense",
      headerName: "Expense",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionsColumns = [
    {
      field: "_id",
      headerName: "ID",
      type: "string",
      flex: 1,
      // editable: true,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      type: "string",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      type: "number",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];
  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productsData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          // modify the style of the whole datagrid
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productsData || []}
            columns={productsColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionsData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          // modify the style of the whole datagrid
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionsData || []}
            columns={transactionsColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown by Category" sideText="+4%" />
        <FlexBetween gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}`} textAlign="center">
              <PieChart
                width={110}
                height={100}
                margin={{
                  top: 0,
                  right: -10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5" sx={{ marginTop: "-5px" }}>
                {data[0].name}
              </Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
