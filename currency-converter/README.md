##5.2 App Name & Description
Currency Converter is a React-based web application that allows users to instantly compare exchange rates between  currencies and visualize historical trends.

Features
* Convert between major currencies
* View the latest exchange rate in real-time using the ExchangeRate API
* Save favorite currency pairs to Airtable
* Display historical exchange rate trends over the past 30 days
* Fetch news related to forex and currency topics

5.3 Getting Started

How to Run Locally
1. Clone the repository: git clone https://github.com/junesutan/currency-converter.git
2. cd currency-converter
4. Install dependencies: npm install
6. Create a .env file in the root folder and add your API keys:
VITE_API_KEY=your_exchange_rate_api_key
VITE_AIRTABLE_API_KEY=your_airtable_api_key
VITE_AIRTABLE_BASE_ID=your_airtable_base_id
VITE_AIRTABLE_TABLE=your_table_name
7. Run the app:npm run dev

5.4 Attributions
* Exchange Rate API – https://exchangerate.host
* Airtable API – https://airtable.com/api
* News API – https://newsapi.org
* React & Recharts libraries for data visualization


5.5 Technologies Used
React and Vite for front end 
Fetch API
Recharts for data Visualization	
Airtable to CRUD database 

5.6 Next Steps 🚀
* More currencies 
* Add search functionality for currencies in the dropdown menu
* Delete and update fav pairs 
