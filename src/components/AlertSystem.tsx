import { useAquaStore } from '../stores/useAquaStore';

export const AlertSystem = () => {
  const { alerts } = useAquaStore();
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Alerts</h3>
        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
          {alerts.length} Active
        </span>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <div 
              key={alert.id}
              className={`p-3 rounded-lg border-l-4 ${
                alert.severity === 'critical' ? 'bg-red-50 border-red-500' :
                alert.severity === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                'bg-green-50 border-green-500'
              }`}
            >
              <div className="flex justify-between">
                <span className="font-medium">{alert.message}</span>
                <span className="text-xs text-gray-500">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No active alerts
          </div>
        )}
      </div>
    </div>
  );
};