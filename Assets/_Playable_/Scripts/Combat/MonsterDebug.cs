using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Log helper cho hệ combat, tách riêng khỏi Debug.Log rải rác để bật/tắt log chi tiết 1 chỗ khi build
    /// Luna (playable ads). QUAN TRỌNG: string nội suy ($"...") được C# evaluate TRƯỚC khi gọi Log(), nên
    /// caller phải tự guard "if (MonsterDebug.VerboseLoggingEnabled)" trước khi gọi Log() với string nội
    /// suy - check bên trong Log() chỉ chặn Debug.Log thực thi, không tránh được alloc string ở call site.
    /// </summary>
    public static class MonsterDebug
    {
        public static bool VerboseLoggingEnabled = false;

        public static void Log(string tag, string message)
        {
            if (!VerboseLoggingEnabled)
            {
                return;
            }

            Debug.Log("[" + tag + "] " + message);
        }

        public static void LogWarning(string tag, string message)
        {
            Debug.LogWarning("[" + tag + "] " + message);
        }

        public static void LogError(string tag, string message)
        {
            Debug.LogError("[" + tag + "] " + message);
        }
    }
}
