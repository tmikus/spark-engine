/**
 * Class uses for storing version information.
 *
 * @param {number} [major] Major part of the version.
 * @param {number} [minor] Minor part of the version.
 * @param {number} [build] Build number
 * @param {number} [revision] Revision number
 * @constructor
 * @class
 */
function Version(major, minor, build, revision)
{
    this.m_build = build || 0;
    this.m_major = major || 0;
    this.m_minor = minor || 0;
    this.m_revision = revision || 0;
}

Version.prototype =
{
    /**
     * Build number.
     * @type {number}
     */
    m_build: 0,
    /**
     * Major part of the version.
     * @type {number}
     */
    m_major: 0,
    /**
     * Minor part of the version.
     * @type {number}
     */
    m_minor: 0,
    /**
     * Revision number.
     * @type {number}
     */
    m_revision: 0,
    /**
     * Checks if the version equals specified version.
     *
     * @param {Version|number} version Version or major number.
     * @param {number} [minor] Minor number.
     * @param {number} [build] Build number
     * @param {number} [revision] Revision number.
     * @returns {boolean} True if equals; otherwise false.
     */
    equals: function equals(version, minor, build, revision)
    {
        if (version instanceof Version)
        {
            minor = version.m_minor;
            build = version.m_build;
            revision = version.m_revision;
            version = version.m_major;
        }

        return (this.m_major == version)
            && (minor == undefined || this.m_minor == minor)
            && (build == undefined || this.m_build == build)
            && (revision == undefined || this.m_revision == revision);
    },
    /**
     * Checks if the version is greater than specified version.
     *
     * @param {Version|number} version Version or major number.
     * @param {number} [minor] Minor number.
     * @param {number} [build] Build number
     * @param {number} [revision] Revision number.
     * @returns {boolean} True if is greater; otherwise false.
     */
    greater: function greater(version, minor, build, revision)
    {
        if (version instanceof Version)
        {
            minor = version.m_minor;
            build = version.m_build;
            revision = version.m_revision;
            version = version.m_major;
        }

        if (this.m_major > version)
        {
            return true;
        }
        else if (this.m_major == version && minor != undefined)
        {
            if (this.m_minor > minor)
            {
                return true;
            }
            else if (this.m_minor == minor && build != undefined)
            {
                if (this.m_build > build)
                {
                    return true;
                }
                else if (this.m_build == build && revision != undefined)
                {
                    return this.m_revision > revision;
                }
            }
        }

        return false;
    },
    /**
     * Checks if the version is greater or equal than specified version.
     *
     * @param {Version|number} version Version or major number.
     * @param {number} [minor] Minor number.
     * @param {number} [build] Build number
     * @param {number} [revision] Revision number.
     * @returns {boolean} True if is greater or equal; otherwise false.
     */
    greaterOrEqual: function greaterOrEqual(version, minor, build, revision)
    {
        return this.equals(version, minor, build, revision) || this.greater(version, minor, build, revision);
    },
    /**
     * Checks if the version is less than specified version.
     *
     * @param {Version|number} version Version or major number.
     * @param {number} [minor] Minor number.
     * @param {number} [build] Build number
     * @param {number} [revision] Revision number.
     * @returns {boolean} True if is less; otherwise false.
     */
    less: function less(version, minor, build, revision)
    {
        if (version instanceof Version)
        {
            minor = version.m_minor;
            build = version.m_build;
            revision = version.m_revision;
            version = version.m_major;
        }

        if (this.m_major < version)
        {
            return true;
        }
        else if (this.m_major == version && minor != undefined)
        {
            if (this.m_minor < minor)
            {
                return true;
            }
            else if (this.m_minor == minor && build != undefined)
            {
                if (this.m_build < build)
                {
                    return true;
                }
                else if (this.m_build == build && revision != undefined)
                {
                    return this.m_revision < revision;
                }
            }
        }

        return false;
    },
    /**
     * Checks if the version is less or equal than specified version.
     *
     * @param {Version|number} version Version or major number.
     * @param {number} [minor] Minor number.
     * @param {number} [build] Build number
     * @param {number} [revision] Revision number.
     * @returns {boolean} True if is less or equal; otherwise false.
     */
    lessOrEqual: function lessOrEqual(version, minor, build, revision)
    {
        return this.equals(version, minor, build, revision) || this.less(version, minor, build, revision);
    }
};